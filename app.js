import express from "express";
import fetch from "node-fetch";
import * as cheerio from "cheerio";

const app = express();
const PORT = process.env.PORT || 3000;

const PRICE_CONFIG = {
  URL: "https://xn--42cah7d0cxcvbbb9x.com/",
  SELECTOR: {
    DATE: "#rightCol > div.divgta.goldshopf > table > tbody > tr:nth-child(4) > td.span.bg-span.txtd.al-r",
    UPDATE_TIME:
      "#rightCol > div.divgta.goldshopf > table > tbody > tr:nth-child(4) > td.em.bg-span.txtd.al-r",
    GOLD_BUY:
      "#rightCol > div.divgta.goldshopf > table > tbody > tr:nth-child(2) > td:nth-child(3)",
    GOLD_SELL:
      "#rightCol > div.divgta.goldshopf > table > tbody > tr:nth-child(2) > td:nth-child(2)",
    GOLD_BAR_BUY:
      "#rightCol > div.divgta.goldshopf > table > tbody > tr:nth-child(1) > td:nth-child(3)",
    GOLD_BAR_SELL:
      "#rightCol > div.divgta.goldshopf > table > tbody > tr:nth-child(1) > td:nth-child(2)",
    PRICE_COMPARE_PREVIOUS:
      "#rightCol > div.divgta.goldshopf > table > tbody > tr:nth-child(3) > td.em.bg-em.al-l.g-d",
    PRICE_COMPARE_YESTERDAY:
      "#rightCol > div.divgta.goldshopf > table > tbody > tr:nth-child(3) > td.span.bg-span.g-d",
  },
};

const priceHandler = async () => {
  try {
    const response = await fetch(PRICE_CONFIG.URL, { method: "GET" });
    const statusCode = response.status;
    const body = await response.text();

    if (statusCode !== 200) {
      return {
        status: "failure",
        response: "Service is unavailable, Please try again later.",
      };
    }

    const $ = cheerio.load(body);

    const s = PRICE_CONFIG.SELECTOR;
    const date = $(s.DATE).text().trim();
    const updateTime = $(s.UPDATE_TIME).text().trim();
    const goldBuy = $(s.GOLD_BUY).text().trim();
    const goldSell = $(s.GOLD_SELL).text().trim();
    const goldBarBuy = $(s.GOLD_BAR_BUY).text().trim();
    const goldBarSell = $(s.GOLD_BAR_SELL).text().trim();
    const priceComparePrevious = $(s.PRICE_COMPARE_PREVIOUS).text().trim();
    const priceCompareYesterday = $(s.PRICE_COMPARE_YESTERDAY)
      .text()
      .trim()
      .substring(7);

    const formatPriceComparePrevious =
      priceComparePrevious.charAt(0) === "-"
        ? priceComparePrevious
        : `+${priceComparePrevious}`;
    const formatPriceCompareYesterday =
      priceCompareYesterday.charAt(0) === "-"
        ? priceCompareYesterday
        : `+${priceCompareYesterday}`;

    return {
      status: "success",
      response: {
        date,
        update_time: updateTime,
        price: {
          gold: {
            buy: goldBuy,
            sell: goldSell,
          },
          gold_bar: {
            buy: goldBarBuy,
            sell: goldBarSell,
          },
          change: {
            compare_previous: formatPriceComparePrevious,
            compare_yesterday: formatPriceCompareYesterday,
          },
        },
      },
    };
  } catch (error) {
    return {
      status: "failure",
      response: `Error occurred: ${error.message}`,
    };
  }
};

app.get("/gold-price", async (req, res) => {
  const result = await priceHandler();
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
