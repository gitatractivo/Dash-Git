
"use client"

import { useAuthContext } from '@/components/Providers/UserProvider';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const LectureComponent = () => {
  // const { data: session } = useSession();
  const { user, isLoaded, isSignedIn } = useAuthContext();
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  console.log(subjects)

  useEffect(() => {
    // 

    const fetchSubjectss = async () => {
      const response = await fetch('/api/subject');
      if (response.ok) {
        const data = await response.json();
        setSubjects(data);
      }
    };

    fetchSubjectss();
  }, [isLoaded, isSignedIn]);


  const handleSubjectChange = (e:any) => {
    setSelectedSubject(e.target.value);
  };

  return (
    <div className='mt-4 mx-4 flex flex-col gap-4'>
      <h1 className='text-xl font-bold'>

      Create a new lecture 
      </h1>
      {
        !isLoaded && <p>Loading...</p>
      }
      {isLoaded && user?.role === 'TEACHER' && (
        <div className='flex gap-3'>
          <select value={selectedSubject} onChange={handleSubjectChange}>
            <option value="">Select a subject</option>
            {subjects.map((subject:any) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
          {selectedSubject && (
            <Link href={`/lecture/new?subjectId=${selectedSubject}`}>
              <Button>Add Lecture</Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default LectureComponent;