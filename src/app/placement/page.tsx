import React from 'react'
import {data,Employee} from "@/lib/data"
type Props = {}
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const page = (props: Props) => {

  return (
    <div className="w-full max-w-[800px] mx-auto flex flex-col items-center justify-center ">
      <Table>
        <TableCaption>Placement Data</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Package</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Cgpa</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">{invoice.name}</TableCell>
              <TableCell>{invoice.package}</TableCell>
              <TableCell>{invoice.age}</TableCell>
              <TableCell className="text-right">{invoice.gender}</TableCell>
              <TableCell className="text-right">{invoice.phone}</TableCell>
              <TableCell>{invoice.company}</TableCell>
              <TableCell>{invoice.cgpa}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter className="w-full">
          <TableRow className="w-full">
            <TableCell colSpan={6}>Total</TableCell>
            <TableCell className="">{data.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

export default page