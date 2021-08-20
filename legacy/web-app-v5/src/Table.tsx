import { DataPoint } from './Home';
import 'flexlayout-react/style/light.css';

type TableProps = {
    data: Array<DataPoint>;
}

function Table({ data }: TableProps) {
    return (
        <div className="table">
            <table className="simple_table">
                <tbody>
                    <tr><th>x</th><th>u</th><th>d</th><th>xu</th><th>xd</th></tr>
                    {data.map((point: DataPoint) => (
                        <tr><td>{point.x}</td><td>{point.u}</td><td>{point.d}</td><td>{point.xu}</td><td>{point.xd}</td></tr>
                    ))}
                </tbody>
            </table>
        </div>
    );


}

export default Table;