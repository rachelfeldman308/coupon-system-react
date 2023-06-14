import { Notyf } from "notyf";


class NotificationService {
  private notify = new Notyf({ duration: 4000, position: { x: "left", y: "bottom" } });

  public success(message: string): void {
    this.notify.success(message);
  }

  public error(error: any): void {
    const errorMessage = this.extractErrorMessage(error);
    this.notify.error(errorMessage);
  }

  private extractErrorMessage(error: any): string {
    if (typeof error === "string") {
      return error;
    }
    if (typeof error.response?.data === "string") {
      return error.response.data;
    }
    if (typeof error.response?.data.message === "string") {
      return error.response.data.message;
    }
    if (Array.isArray(error.response?.data)) {
      return error.response.data[0];
    }
    if (typeof error.message === "string") {
      return error.message;
    }
    return "some error occurred . please try again"
  }
}
const notificationService = new NotificationService();
export default notificationService;