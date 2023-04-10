import { useSpecs } from "../../contexts/SpecsContext";

export default function Memory() {
  const [specs] = useSpecs();

    return (
      <table class="pure-table">
      <thead>
        <tr>
          <th colSpan={2}>Memory</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Total</td>
          <td>
            {(specs.mem.total / 1e9).toFixed(0)}GB
          </td>
        </tr>
        <tr>
          <td>Total Swap</td>
          <td>
            {(specs.mem.swaptotal / 1e9).toFixed(0)}GB
          </td>
        </tr>
        <tr>
          <td>Layout</td>
          <td>
            {specs
                .memLayout.map(
                  (m) =>
                    `${(m.size / 1e9).toFixed(0)}GB`
                )
                .join(", ")}
          </td>
        </tr>
      </tbody>
    </table>
    );
  }
  