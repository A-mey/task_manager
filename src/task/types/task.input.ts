import { inputTask } from "./input.task";

export type task = inputTask & {
    id: string;
    status: "pending" | "completed"
}