import { useSpecs } from "../../contexts/SpecsContext";

export default function Disk() {
  const [specs] = useSpecs();

  if (!specs.diskLayout || !specs.diskLayout.length > 0) return <p>This information isn't available</p>

    return (
      <table class="pure-table">
      <thead>
        <tr>
          <th colSpan={2}>Disk</th>
        </tr>
      </thead>
      <tbody>
        {
          specs.diskLayout.map((disk) => {
            return (
              <>
                <tr><td colSpan={2}>{disk.name}</td></tr>
                <tr>
                  <td>Type</td>
                  <td>
                    {disk.type}
                  </td>
                </tr>
                <tr>
                  <td>Total</td>
                  <td>
                    {(disk.size / 1e9).toFixed(0)}GB
                  </td>
                </tr>
              </>
            )
          })
        }
      </tbody>
    </table>
    );
  }
  