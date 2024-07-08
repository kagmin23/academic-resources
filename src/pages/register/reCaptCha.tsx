import axios from 'axios';

const api_key: string = "YOUR_API_KEY";
const site_key: string = "6Le-wvkSAAAAAPBMRTvw0Q4Muexq9bi0DJwx_mJ-";
const site_url: string = "https://www.google.com/recaptcha/api2/demo";

interface TaskPayload {
  clientKey: string;
  task: {
    type: string;
    websiteKey: string;
    websiteURL: string;
  };
}

interface TaskResponse {
  taskId: string;
}

async function capsolver() {
  const payload: TaskPayload = {
    clientKey: api_key,
    task: {
      type: 'ReCaptchaV2TaskProxyLess',
      websiteKey: site_key,
      websiteURL: site_url
    }
  };

  try {
    const res = await axios.post<TaskResponse>("https://api.capsolver.com/createTask", payload);
    const task_id = res.data.taskId;
    if (!task_id) {
      console.log("Failed to create task:", res.data);
      return;
    }
    console.log("Got taskId:", task_id);

    while (true) {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Delay for 1 second

      const getResultPayload = { clientKey: api_key, taskId: task_id };
      const resp = await axios.post<any>("https://api.capsolver.com/getTaskResult", getResultPayload);
      const status = resp.data.status;

      if (status === "ready") {
        return resp.data.solution.gRecaptchaResponse;
      }
      if (status === "failed" || resp.data.errorId) {
        console.log("Solve failed! response:", resp.data);
        return;
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

capsolver().then(token => {
  console.log(token);
});
