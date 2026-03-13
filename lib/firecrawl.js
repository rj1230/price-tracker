import FirecrawlApp from "@mendable/firecrawl-js";

const firecrawl = new FirecrawlApp({
  apiKey: process.env.FIRE_CRAWL_API_KEY,
});

export async function scrapeProduct(url) {
  try {
    const result = await firecrawl.scrapeUrl(url, {
      formats: ["extract"],
      extract: {
        prompt:
          "Extract the product name as 'productName', current price as a number as 'currentPrice', currency code (USD, EUR, etc) as 'currencyCode', and product image URL as 'productImageUrl'",
        schema: {
          type: "object",
          properties: {
            productName: { type: "string" },
            currentPrice: { type: "number" },
            currencyCode: { type: "string" },
            productImageUrl: { type: "string" },
          },
          required: ["productName", "currentPrice"],
        },
      },
    });

    const extractedData = result.extract;

    if (!extractedData) {
      throw new Error("No data extracted");
    }

    return extractedData;
  } catch (error) {
    console.error("Firecrawl scrape error:", error);
    throw new Error(`Failed to scrape product: ${error.message}`);
  }
}
