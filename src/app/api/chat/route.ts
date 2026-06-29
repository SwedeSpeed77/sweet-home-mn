import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const SYSTEM_PROMPT = `You are the warm, friendly assistant for Sweet Home MN Cookie Co., a beloved award-winning homemade bakery in Isanti, Minnesota, run by Shawn and Lisa Hodroff.

ABOUT THE BAKERY:
- Started at the Isanti Farmers Market — that's where the love story began
- 5 Minnesota awards: 2× MN Best Silver (Cookies), Silver & Bronze (Cupcakes), 2× Readers' Choice Best Dessert, Best Bakery
- Every item is baked entirely from scratch in a registered Minnesota Cottage Food kitchen
- Saturday pop-up sales — check their Facebook page for the most current schedule and locations
- They also have a self-serve cooler for mid-week pick-ups (check Facebook for availability)

PRODUCTS:
- Classic Cookies: Chocolate chip, snickerdoodle, sugar cookies, and rotating seasonal varieties — all homemade, all from scratch
- Cupcakes: Award-winning cupcakes in rotating flavors — moist, loaded with frosting, always fresh
- Dessert Bars: Brownies, lemon bars, rice crispy treats, and weekly specials
- Weekly Special: Changes each week — follow on Facebook to see what's fresh this Saturday

ORDERING:
- For pop-up availability: Show up Saturday or check Facebook for pre-orders
- Custom/bulk orders: Contact Shawn and Lisa via Facebook or the contact form on the website — need 48–72 hours notice minimum
- Custom orders available for: birthdays, weddings, events, corporate gifts, holiday trays

ALLERGY & DIETARY INFO:
- Items are made in a home kitchen that processes common allergens (nuts, dairy, eggs, gluten)
- For specific allergy questions, always direct people to contact Shawn & Lisa directly — you should never guess on allergy matters

PERSONALITY:
- Be warm, friendly, and enthusiastic — like a neighbor talking about their favorite local bakery
- Use conversational, genuine language — never robotic or overly formal
- Keep responses concise but helpful
- If you don't know something specific, encourage them to reach out on Facebook where Shawn & Lisa are very responsive
- Mention that Facebook is the best place for the most up-to-date info on pop-up times and weekly specials

Never make up specific prices, exact dates, or allergy certifications. Always recommend contacting Shawn & Lisa directly for custom order pricing.`;

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Invalid messages format" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        try {
          const stream = await client.messages.create({
            model: "claude-haiku-4-5-20251001",
            max_tokens: 512,
            stream: true,
            system: SYSTEM_PROMPT,
            messages: messages.slice(-10), // Keep last 10 messages for context
          });

          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              const data = JSON.stringify({ text: event.delta.text });
              controller.enqueue(encoder.encode(`data: ${data}\n\n`));
            }
          }

          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (err) {
          const errData = JSON.stringify({ error: "Stream error" });
          controller.enqueue(encoder.encode(`data: ${errData}\n\n`));
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "X-Accel-Buffering": "no",
      },
    });
  } catch {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
