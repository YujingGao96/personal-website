import {redirect} from "next/navigation";

export default function MissingRoute() {
    redirect("/error/404");
}
