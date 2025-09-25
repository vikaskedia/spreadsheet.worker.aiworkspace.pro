/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx) {
		return new Response('Hello World from spreadsheet-worker deployment!');
	},
	async scheduled(event, env, ctx) {
		// Runs on cron schedules defined in wrangler.jsonc
		switch (event.cron) {
			case "*/5 * * * *":
				// Every five minutes
				await testAPI(env);
				break;
			case "*/10 * * * *":
				// Every ten minutes
				await testAPI();
				break;
			case "0 9 * * *":
				// Every day at 9 am utc
				await handleCron();
				break;
		}
	},
};


async function handleCron(env) {
  console.log("Cron triggered at", new Date().toISOString());
  
  //const apiUrl = "https://spreadsheet.aiworkspace.pro/api/spreadsheet-analysis?workspace_id=686&portfolio_id=portfolio_1754496102288_yzut7nhkn";
  //const apiUrl = "https://spreadsheet.aiworkspace.pro/api/update-spreadsheet";
  const apiUrl = "https://spreadsheet.aiworkspace.pro/api/spreadsheet-analysis";
  const params = new URLSearchParams({
	workspace_id: "309", //"686",
	portfolio_id:"portfolio_95_1753135771.217412", // "portfolio_1754496102288_yzut7nhkn"
  });
  
  const response = await fetch(`${apiUrl}?${params.toString()}`, {
	method: "GET",
	headers: {
	  "Content-Type": "application/html",
	  // Add any other necessary headers here
	},
  });

  if (!response.ok) {
	console.error("Error calling API:", response.statusText);
	return;
  }
  const result = await response.text();
  console.log("API call result:", result);
  return result;
}


// Example function to run
async function testAPI() {
  // test cron 
  console.log("Data fetched by cron:");
}