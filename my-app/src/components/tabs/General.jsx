import { useSpecs } from "../../contexts/SpecsContext";

// <td>{(specs().memory.physical.total / 1e9).toFixed(0)}GB</td>

export default function General() {
    const [specs] = useSpecs();

    return (
      <table class="pure-table">
        <thead>
          <tr>
            <th colSpan={2}>General</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>CPU</td>
            <td>
              {specs.cpu.manufacturer} {specs.cpu.brand} ({specs.cpu.speed}GHz)
            </td>
          </tr>
          <tr>
            <td>Graphics</td>
            <td>
              {specs.graphics.controllers[0].name}
            </td>
          </tr>
          <tr>
            <td>Memory</td>
            <td>{(specs.mem.total / 1e9).toFixed(0)}GB</td>
          </tr>
          <tr>
            <td>OS</td>
            <td>{specs.osInfo.distro} ({specs.osInfo.platform}, {specs.osInfo.kernel})</td>
          </tr>
          <tr>
            <td>Displays</td>
            <td>
              {specs
                .graphics.displays?.map(
                  (d) =>
                    `${d.resolutionX}x${d.resolutionY}@${d.currentRefreshRate}`
                )
                .join(", ")}
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
  