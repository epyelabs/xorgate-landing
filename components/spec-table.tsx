import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Hardware spec comparison (design.md). First column is the spec name,
// remaining columns are boards.
export function SpecTable({
  columns,
  rows,
}: {
  columns: string[]
  rows: { label: string; values: string[] }[]
}) {
  return (
    <div className="overflow-x-auto rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-40">Spec</TableHead>
            {columns.map((column) => (
              <TableHead key={column}>{column}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.label}>
              <TableCell className="font-medium text-muted-foreground">
                {row.label}
              </TableCell>
              {row.values.map((value, index) => (
                <TableCell key={index} className="whitespace-normal">
                  {value || "—"}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
