import { useSpecs } from "../../contexts/SpecsContext";

export default function System() {
  const [specs] = useSpecs();

  return (
    <table class="pure-table">
      <thead>
        <tr>
          <th colSpan={2}>System</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Manufacturer</td>
          <td>
            {specs.system.manufacturer}
          </td>
        </tr>
        <tr>
          <td>Model</td>
          <td>
            {specs.system.model}
          </td>
        </tr>
        <tr>
          <td>Motherboard</td>
          <td>
            {specs.baseboard.model}
          </td>
        </tr>
        <tr>
          <td>BIOS</td>
          <td>
            {specs.bios.vendor} {specs.bios.version} ({specs.bios.releaseDate ?? 'unknown'})
          </td>
        </tr>
        <tr>
          <td>Chassis</td>
          <td>
            {specs.chassis.manufacturer} {specs.chassis.model ?? 'unknown'}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
