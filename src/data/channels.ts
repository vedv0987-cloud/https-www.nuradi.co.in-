import { Channel } from "@/types";
import database from "./database.json";

export const channels: Channel[] = database.channels as Channel[];
