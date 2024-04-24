'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type AttendanceRecord = {
  id: string;
  student: {
    id: string;
    name: string;
  };
  status: 'PRESENT' | 'ABSENT';
};

function AttendanceTable({ lectureId }: { lectureId: string }) {
  const router = useRouter();
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);

  const fetchAttendanceRecords = async () => {
    const res = await fetch(`/api/lecture/${lectureId}`);
    const { attendanceRecords } = await res.json();
    setAttendanceRecords(attendanceRecords);
  };

  const handleRefresh = () => {
    fetchAttendanceRecords();
  };

  return (
    <div>
      <div className="mb-4 w-full">
        <Button onClick={handleRefresh} className='mx-auto'>Refresh</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student Name</TableHead>
            <TableHead>Attendance Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attendanceRecords.map((record) => (
            <TableRow key={record.id}>
              <TableCell>{record.student.name}</TableCell>
              <TableCell>{record.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default AttendanceTable;