import { Dynamic } from "solid-js/web";
import { lazy, splitProps } from "solid-js";

const tabs = {
    "General": lazy(() => import("./tabs/General")),
    "System": lazy(() => import("./tabs/System")),
    "CPU": lazy(() => import("./tabs/CPU")),
    "Memory": lazy(() => import("./tabs/Memory")),
    "Graphics": lazy(() => import("./tabs/Graphics")),
    "OS": lazy(() => import("./tabs/OS")),
    "Disk": lazy(() => import("./tabs/Disk")),
}

export default function TabRouter(props) {
    const [local, others] = splitProps(props, ["tab"]);

    return <Dynamic component={tabs[local.tab() || "General"]} />
}