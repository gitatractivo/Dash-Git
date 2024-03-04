const data:Employee[] = [
  {
    id: "609d6f99c53502001125f758",
    name: "John Doe",
    package: "50000",
    age: 35,
    gender: "Male",
    phone: "+91 98765-43210",
    company: "XYZ Corporation",
    cgpa: 8.5,
  },
  {
    id: "609d6f99c53502001125f759",
    name: "Alice Smith",
    package: "60000",
    age: 28,
    gender: "Female",
    phone: "+91 87654-32109",
    company: "ABC Industries",
    cgpa: 9.2,
  },
  {
    id: "609d6f99c53502001125f75a",
    name: "Bob Johnson",
    package: "55000",
    age: 45,
    gender: "Male",
    phone: "+91 76543-21098",
    company: "DEF Corporation",
    cgpa: 7.8,
  },
  {
    id: "609d6f99c53502001125f75b",
    name: "Emily Brown",
    package: "65000",
    age: 32,
    gender: "Female",
    phone: "+91 65432-10987",
    company: "GHI Enterprises",
    cgpa: 9.8,
  },
  {
    id: "609d6f99c53502001125f758",
    name: "David Lee",
    package: "55000",
    age: 40,
    gender: "Male",
    phone: "+91 98765-12345",
    company: "ABC Corporation",
    cgpa: 8.0,
  },
  {
    id: "609d6f99c53502001125f759",
    name: "Emma White",
    package: "62000",
    age: 25,
    gender: "Female",
    phone: "+91 87654-54321",
    company: "XYZ Industries",
    cgpa: 9.5,
  },
  {
    id: "609d6f99c53502001125f75a",
    name: "James Miller",
    package: "58000",
    age: 50,
    gender: "Male",
    phone: "+91 76543-67890",
    company: "DEF Enterprises",
    cgpa: 7.2,
  },
  {
    id: "609d6f99c53502001125f75b",
    name: "Sophia Brown",
    package: "67000",
    age: 30,
    gender: "Female",
    phone: "+91 65432-98765",
    company: "GHI Corporation",
    cgpa: 8.9,
  },
];



type Gender = "Male" | "Female" | "Other";

interface Employee {
  id: string;
  name: string;
  package: string;
  age: number;
  gender: Gender;
  phone: string;
  company: string;
  cgpa: number;
}
