export class HTTPClient {
  baseUrl: string;

  constructor(url: string = "localhost:5050") {
    this.baseUrl = url;
  }

  // Create a new task
  async createTask(taskData: object) {
    const response = await fetch(`http://${this.baseUrl}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });

    return response.json();
  }

  // Get all tasks
  async getTasks() {
    const response = await fetch(`http://${this.baseUrl}/tasks/`);

    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    return response.json();
  }

  // Get a specific task by task_id
  async getTaskById(taskId: string) {
    const response = await fetch(`http://${this.baseUrl}/tasks/${taskId}`);

    if (!response.ok) {
      throw new Error('Failed to fetch task');
    }

    return response.json();
  }

  // Update a specific task by task_id
  async updateTask(taskId: number, status: string) {
    const response = await fetch(`http://${this.baseUrl}/tasks/${taskId}?status=${status}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(status),
    });

    return response.json();
  }

  // Delete a specific task by task_id
  async deleteTask(taskId: number) {
    const response = await fetch(`http://${this.baseUrl}/tasks/${taskId}`, {
      method: 'DELETE',
    });

    return response.ok;
  }

  // Get all devices
  async getDevices() {
    const response = await fetch(`http://${this.baseUrl}/devices/`);

    if (!response.ok) {
      throw new Error('Failed to fetch devices');
    }

    return response.json();
  }

  // Send a custom notification
  async sendMessage(data: string) {
    const response = await fetch(`http://${this.baseUrl}/notify/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data
    });

    return response.json();
  }
}

export class WSClient {
  baseUrl: string;
  ws: WebSocket;

  constructor(url: string = "localhost:5050", onMessage: (data: any) => void, clientId: string = "1") {
    this.baseUrl = url;
    this.ws = new WebSocket(`ws://${this.baseUrl}/ws/${clientId}`);
    this.ws.onopen = () => {
      console.log("WebSocket connection opened");
    };
    this.ws.onmessage = (event) => {
      onMessage(event.data);
    };
    this.ws.onclose = () => {
      console.log("WebSocket connection closed");
    };
  }

  send(message: string) {
    this.ws.send(message);
  }

  close() {
    this.ws.close();
  }
}
