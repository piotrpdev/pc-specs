import { useSpecs } from "../../contexts/SpecsContext";

export default function Graphics() {
  const [specs] = useSpecs();

  if (!specs.graphics?.controllers || !specs.graphics.controllers.length) return <p>This information isn't available</p>

    return (
      <table class="pure-table">
      <thead>
        <tr>
          <th colSpan={2}>Graphics</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Vendor</td>
          <td>
            {specs.graphics.controllers[0].vendor}
          </td>
        </tr>
        <tr>
          <td>Name</td>
          <td>
            {specs.graphics.controllers[0].name ?? "?"}
          </td>
        </tr>
        <tr>
          <td>Model</td>
          <td>
            {specs.graphics.controllers[0].model}
          </td>
        </tr>
        <tr>
          <td>Memory</td>
          <td>
            {specs.graphics.controllers[0].memoryTotal ?? "?"} MB
          </td>
        </tr>
        <tr>
          <td>Driver</td>
          <td>
            v{specs.graphics.controllers[0].driverVersion ?? "?"}
          </td>
        </tr>
        <tr>
            <td>Displays</td>
            <td>
              {specs
                .graphics.displays?.map(
                  (d) =>
                    `${d.resolutionX}x${d.resolutionY}@${d.currentRefreshRate ?? "?"}`
                )
                .join(", ")}
            </td>
          </tr>
      </tbody>
    </table>
    );
  }
  