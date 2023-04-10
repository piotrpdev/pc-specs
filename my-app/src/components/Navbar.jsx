import { splitProps } from "solid-js";

export const tabNames = ["General", "System", "CPU", "Memory", "Graphics", "OS", "Disk"];

export default function Navbar(props) {
    const [local, others] = splitProps(props, ["styles", "tabSignal"]);
    const [selectedTab, setSelectedTab] = local.tabSignal;

    return <div class={`pure-menu pure-menu-horizontal ${local.styles}`}>
        <ul class="pure-menu-list">
            {tabNames.map((name) => <li class={`pure-menu-item${selectedTab() === name ? " pure-menu-selected" : ""}`}><a href="#" class="pure-menu-link" onClick={() => setSelectedTab(name)}>{name}</a></li>)}
        </ul>
      </div>
}