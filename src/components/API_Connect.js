import { extractUsefulData } from "./JSON_Cleaner";
var final_data = "";

const fetch_BS_Quick = async () => {
  const b_s = await fetch("http://localhost:8000/getBalanceSheet", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      id: `${localStorage.getItem("mid")}`,
    },
  });

  const data = await b_s.json();

  if (data.hasOwnProperty("Rows") && data.Rows.length !== 0) {
    final_data += `Here is balance sheet data for this company:\n${JSON.stringify(
      extractUsefulData(data)
    )}\n`;
  }
};

const fetch_GL_Quick = async () => {
  const g_l = await fetch("http://localhost:8000/getGL", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      id: localStorage.getItem("mid"),
    },
  });

  const data = await g_l.json();

  if (data.hasOwnProperty("Rows") && data.Rows.length !== 0) {
    final_data += `Here is general ledger data for this company:\n${JSON.stringify(
      extractUsefulData(data)
    )}\n`;
  }
};

const fetch_GLFR_Quick = async () => {
  const gl = await fetch("http://localhost:8000/getGLFR", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      id: localStorage.getItem("mid"),
    },
  });

  const data = await gl.json();
  if (data.hasOwnProperty("Rows") && data.Rows.length !== 0) {
    final_data += `Here is general ledger fr data for this company:\n${JSON.stringify(
      extractUsefulData(data)
    )}\n`;
  }
};

const fetch_PLDetails_Quick = async () => {
  const gl = await fetch("http://localhost:8000/getPLDetails", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      id: localStorage.getItem("mid"),
    },
  });

  const data = await gl.json();

  if (data.hasOwnProperty("Rows") && data.Rows.length !== 0) {
    final_data += `Here is profit loss data for this company:\n${JSON.stringify(
      extractUsefulData(data)
    )}\n`;
  }
};

const fetch_TB_Quick = async () => {
  const gl = await fetch("http://localhost:8000/getTB", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      id: localStorage.getItem("mid"),
    },
  });

  const data = await gl.json();

  if (data.hasOwnProperty("Rows") && data.Rows.length !== 0) {
    final_data += `Here is trial balance data for this company:\n${JSON.stringify(
      extractUsefulData(data)
    )}\n`;
  }
};

async function fetchData(url) {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        id: localStorage.getItem("mid"),
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("API error : " + error);
    throw error;
  }
}

async function fetchMultipleAPIs(urls) {
  for (const url of urls) {
    const data = await fetchData(url);
    // Modify final_data within the loop

    if (data.hasOwnProperty("CompanyInfo")) {
      final_data += `Here is company info for this company:\n${JSON.stringify(
        data.CompanyInfo
      )}\n`;
    } else if (data.hasOwnProperty("QueryResponse")) {
      // Process queryResponse
      const data_name = Object.keys(data.QueryResponse)[0];

      if (typeof data_name !== "undefined") {
        final_data += `Here is ${data_name} data for this company:\n${JSON.stringify(
          data.QueryResponse[data_name]
        )}\n`;
      }
    }
  }
}

const runAll = async () => {
  const links = [
    "http://localhost:8000/getCompanyInfo",
    "http://localhost:8000/account_info",
    "http://localhost:8000/customer_info",
    "http://localhost:8000/vendor_info",
    "http://localhost:8000/employee_info",
    "http://localhost:8000/bills",
    "http://localhost:8000/invoices",
    "http://localhost:8000/payments",
    "http://localhost:8000/budget",
    "http://localhost:8000/class",
    "http://localhost:8000/creditMemo",
    "http://localhost:8000/creditPayments",
    "http://localhost:8000/department",
    "http://localhost:8000/deposit",
    "http://localhost:8000/estimate",
    "http://localhost:8000/item",
    "http://localhost:8000/journalEntry",
    "http://localhost:8000/purchase",
    "http://localhost:8000/purchaseOrders",
    "http://localhost:8000/refundreceipts",
    "http://localhost:8000/Reimbursecharge",
    "http://localhost:8000/SalesReceipts",
    "http://localhost:8000/taxclassifications",
    "http://localhost:8000/taxcode",
    "http://localhost:8000/taxpayment",
    "http://localhost:8000/taxrate",
    "http://localhost:8000/taxagency",
    "http://localhost:8000/term",
    "http://localhost:8000/timeactivity",
    "http://localhost:8000/transfer",
    "http://localhost:8000/vendorCredit",
  ];

  fetch_BS_Quick();
  fetch_GLFR_Quick();
  fetch_GL_Quick();
  fetch_PLDetails_Quick();
  fetch_TB_Quick();
  fetchMultipleAPIs(links);
};

export async function getAI(query) {
  return "Nothing here my friend."
  // if (query.length === 0) {
  //   await runAll();
  // } else {
  //   if(final_data.length === 0) await runAll();
  //   const llm = await fetch("http://localhost:8000/completions", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({"data" : final_data, "query" : query}),
  //   });
  //   const res = llm.text();
  //   return res;
  // }
}
