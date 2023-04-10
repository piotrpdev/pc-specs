import { useSpecs } from "../../contexts/SpecsContext";

export default function CPU() {
  const [specs] = useSpecs();

    return (
      <table class="pure-table">
      <thead>
        <tr>
          <th colSpan={2}>CPU</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Manufacturer</td>
          <td>
            {specs.cpu.vendor} ({specs.cpu.manufacturer})
          </td>
        </tr>
        <tr>
          <td>Brand</td>
          <td>
            {specs.cpu.brand}
          </td>
        </tr>
        <tr>
          <td>Speed</td>
          <td>
            {specs.cpu.speed}GHz ({specs.cpu.speedMin ?? "?"}GHz-{specs.cpu.speedMax}GHz)
          </td>
        </tr>
        <tr>
          <td>Cores</td>
          <td>
            {specs.cpu.cores} ({specs.cpu.physicalCores ?? "?"} Physical, {specs.cpu.performanceCores ?? "?"} Performance, {specs.cpu.efficiencyCores ?? "?"} Efficiency)
          </td>
        </tr>
      </tbody>
    </table>
    );
  }
  