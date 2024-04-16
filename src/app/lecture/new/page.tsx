"use client"
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import QRCode, { QRCodeCanvas } from 'qrcode.react';


type Props = {}

const NewLecture = (props: Props) => {
  const [leacture, setleacture] = useState<unknown>()
  const searchParams = useSearchParams()

  const search = searchParams.get('subjectId')
  console.log(search)

  useEffect(() => {
    const fetchLecutre = async () => {
      const resp = await fetch('/api/lecture', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subjectId: search }),
      })
      const data = await resp.json()
      setleacture(data)
    }
    fetchLecutre()
  }, [search])
  console.log(leacture)
  // @ts-ignore
  const qrCodeUrl = `/lectureSignin/${leacture?.id}`;
  return (
    <div className='w-full flex flex-col gap-4 justify-center items-center'>

      <h1>Lecture {window.location.host + qrCodeUrl}</h1>
      <QRCodeCanvas value={qrCodeUrl} />
      {/* Display the list of students whose attendance is marked */}
    </div>
  )
}

export default NewLecture