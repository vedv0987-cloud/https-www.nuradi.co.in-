import { Video } from "@/types";
import database from "./database.json";

export const videos: Video[] = database.videos as Video[];
