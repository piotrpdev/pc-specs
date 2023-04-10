import { useSpecs } from "../../contexts/SpecsContext";

export default function OS() {
  const [specs] = useSpecs();

    return (
      <table class="pure-table">
      <thead>
        <tr>
          <th colSpan={2}>OS</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Arch</td>
          <td>
            {specs.osInfo.arch}
          </td>
        </tr>
        <tr>
          <td>Distro</td>
          <td>
            {specs.osInfo.distro}
          </td>
        </tr>
        <tr>
          <td>Release</td>
          <td>
            {specs.osInfo.release}
          </td>
        </tr>
        <tr>
          <td>Build</td>
          <td>
            {specs.osInfo.build || "?"}
          </td>
        </tr>
        <tr>
          <td>Kernel</td>
          <td>
            {specs.osInfo.kernel}
          </td>
        </tr>
        <tr>
          <td>Hostname</td>
          <td>
            {specs.osInfo.hostname}
          </td>
        </tr>
      </tbody>
    </table>
    );
  }
  