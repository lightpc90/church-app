import { DeptsEnum } from "../enums/Enums";

export const workersData = [
  {
    _id: "1",
    name: "Folahan Abbey",
    email: "gideonabbey.f@gmail.com",
    phone: "08130853142",
    dept: "Media & Technical",
  },
  {
    _id: 1,
    name: "John Doe",
    dept: "Media and Technical",
    phone: "123-456-7890",
    email: "johndoe@example.com",
  },
  {
    _id: 2,
    name: "Jane Smith",
    dept: "Choir",
    phone: "234-567-8901",
    email: "janesmith@example.com",
  },
  {
    _id: 3,
    name: "Michael Johnson",
    dept: "Protocol",
    phone: "345-678-9012",
    email: "michaeljohnson@example.com",
  },
  {
    _id: 4,
    name: "Emily Davis",
    dept: "Teachers",
    phone: "456-789-0123",
    email: "emilydavis@example.com",
  },
  {
    _id: 5,
    name: "Robert Brown",
    dept: "Ushering",
    phone: "567-890-1234",
    email: "robertbrown@example.com",
  },
  {
    _id: 6,
    name: "Linda Williams",
    dept: "Sanitation",
    phone: "678-901-2345",
    email: "lindawilliams@example.com",
  },
  {
    _id: 7,
    name: "David Jones",
    dept: "Jesus Police",
    phone: "789-012-3456",
    email: "davidjones@example.com",
  },
  {
    _id: 8,
    name: "Susan Miller",
    dept: "Media and Technical",
    phone: "890-123-4567",
    email: "susanmiller@example.com",
  },
  {
    _id: 9,
    name: "James Wilson",
    dept: "Choir",
    phone: "901-234-5678",
    email: "jameswilson@example.com",
  },
  {
    _id: 10,
    name: "Karen Taylor",
    dept: "Protocol",
    phone: "012-345-6789",
    email: "karentaylor@example.com",
  },
  {
    _id: 11,
    name: "Charles Anderson",
    dept: "Teachers",
    phone: "123-456-7890",
    email: "charlesanderson@example.com",
  },
  {
    _id: 12,
    name: "Patricia Thomas",
    dept: "Ushering",
    phone: "234-567-8901",
    email: "patriciathomas@example.com",
  },
  {
    _id: 13,
    name: "Steven Jackson",
    dept: "Sanitation",
    phone: "345-678-9012",
    email: "stevenjackson@example.com",
  },
  {
    _id: 14,
    name: "Sarah White",
    dept: "Jesus Police",
    phone: "456-789-0123",
    email: "sarahwhite@example.com",
  },
  {
    _id: 15,
    name: "Christopher Harris",
    dept: "Media and Technical",
    phone: "567-890-1234",
    email: "christopherharris@example.com",
  },
  {
    _id: 16,
    name: "Laura Martin",
    dept: "Choir",
    phone: "678-901-2345",
    email: "lauramartin@example.com",
  },
  {
    _id: 17,
    name: "Daniel Thompson",
    dept: "Protocol",
    phone: "789-012-3456",
    email: "danielthompson@example.com",
  },
  {
    _id: 18,
    name: "Margaret Garcia",
    dept: "Teachers",
    phone: "890-123-4567",
    email: "margaretgarcia@example.com",
  },
  {
    _id: 19,
    name: "George Martinez",
    dept: "Ushering",
    phone: "901-234-5678",
    email: "georgemartinez@example.com",
  },
  {
    _id: 20,
    name: "Barbara Robinson",
    dept: "Sanitation",
    phone: "012-345-6789",
    email: "barbararobinson@example.com",
  },
  {
    _id: 21,
    name: "Paul Clark",
    dept: "Jesus Police",
    phone: "123-456-7890",
    email: "paulclark@example.com",
  },
  {
    _id: 22,
    name: "Nancy Rodriguez",
    dept: "Media and Technical",
    phone: "234-567-8901",
    email: "nancyrodriguez@example.com",
  },
  {
    _id: 23,
    name: "Jason Lewis",
    dept: "Choir",
    phone: "345-678-9012",
    email: "jasonlewis@example.com",
  },
  {
    _id: 24,
    name: "Jennifer Walker",
    dept: "Protocol",
    phone: "456-789-0123",
    email: "jenniferwalker@example.com",
  },
  {
    _id: 25,
    name: "Kevin Hall",
    dept: "Teachers",
    phone: "567-890-1234",
    email: "kevinhall@example.com",
  },
  {
    _id: 26,
    name: "Michelle Allen",
    dept: "Ushering",
    phone: "678-901-2345",
    email: "michelleallen@example.com",
  },
  {
    _id: 27,
    name: "Brian Young",
    dept: "Sanitation",
    phone: "789-012-3456",
    email: "brianyoung@example.com",
  },
  {
    _id: 28,
    name: "Lisa Hernandez",
    dept: "Jesus Police",
    phone: "890-123-4567",
    email: "lisahernandez@example.com",
  },
  {
    _id: 29,
    name: "Andrew King",
    dept: "Media and Technical",
    phone: "901-234-5678",
    email: "andrewking@example.com",
  },
  {
    _id: 30,
    name: "Sandra Wright",
    dept: "Choir",
    phone: "012-345-6789",
    email: "sandrawright@example.com",
  },
];



export const attendanceData: {
  [key: string]: { dept: string; attendance: string; date: string };
}[] = [
  {
    [DeptsEnum.MEDIA_AND_TECHNICAL]: {
      dept: DeptsEnum.MEDIA_AND_TECHNICAL,
      attendance: "23",
      date: "28/08/24",
    },
    [DeptsEnum.CHOIR]: { dept: DeptsEnum.CHOIR, attendance: "43", date: "28/08/24" },
    [DeptsEnum.JESUS_POLIE]: {
      dept: DeptsEnum.JESUS_POLIE,
      attendance: "13",
      date: "28/08/24",
    },
    [DeptsEnum.PROTOCOL]: {
      dept: DeptsEnum.PROTOCOL,
      attendance: "23",
      date: "28/08/24",
    },
    [DeptsEnum.SANITATION]: {
      dept: DeptsEnum.SANITATION,
      attendance: "22",
      date: "28/08/24",
    },
    [DeptsEnum.USHERING]: {
      dept: DeptsEnum.USHERING,
      attendance: "25",
      date: "28/08/24",
    },
    [DeptsEnum.TEACHERS]: {
      dept: DeptsEnum.TEACHERS,
      attendance: "28",
      date: "28/08/24",
    },
  },
  {
    [DeptsEnum.MEDIA_AND_TECHNICAL]: {
      dept: DeptsEnum.MEDIA_AND_TECHNICAL,
      attendance: "22",
      date: "21/08/24",
    },
    [DeptsEnum.CHOIR]: { dept: DeptsEnum.CHOIR, attendance: "46", date: "21/08/24" },
    [DeptsEnum.JESUS_POLIE]: {
      dept: DeptsEnum.JESUS_POLIE,
      attendance: "12",
      date: "21/08/24",
    },
    [DeptsEnum.PROTOCOL]: {
      dept: DeptsEnum.PROTOCOL,
      attendance: "22",
      date: "21/08/24",
    },
    [DeptsEnum.SANITATION]: {
      dept: DeptsEnum.SANITATION,
      attendance: "23",
      date: "21/08/24",
    },
    [DeptsEnum.USHERING]: {
      dept: DeptsEnum.USHERING,
      attendance: "22",
      date: "21/08/24",
    },
    [DeptsEnum.TEACHERS]: {
      dept: DeptsEnum.TEACHERS,
      attendance: "29",
      date: "21/08/24",
    },
  },
  {
    [DeptsEnum.MEDIA_AND_TECHNICAL]: {
      dept: DeptsEnum.MEDIA_AND_TECHNICAL,
      attendance: "27",
      date: "14/08/24",
    },
    [DeptsEnum.CHOIR]: { dept: DeptsEnum.CHOIR, attendance: "46", date: "14/08/24" },
    [DeptsEnum.JESUS_POLIE]: {
      dept: DeptsEnum.JESUS_POLIE,
      attendance: "12",
      date: "14/08/24",
    },
    [DeptsEnum.PROTOCOL]: {
      dept: DeptsEnum.PROTOCOL,
      attendance: "27",
      date: "14/08/24",
    },
    [DeptsEnum.SANITATION]: {
      dept: DeptsEnum.SANITATION,
      attendance: "23",
      date: "14/08/24",
    },
    [DeptsEnum.USHERING]: {
      dept: DeptsEnum.USHERING,
      attendance: "26",
      date: "14/08/24",
    },
    [DeptsEnum.TEACHERS]: {
      dept: DeptsEnum.TEACHERS,
      attendance: "25",
      date: "14/08/24",
    },
  },
  {
    [DeptsEnum.MEDIA_AND_TECHNICAL]: {
      dept: DeptsEnum.MEDIA_AND_TECHNICAL,
      attendance: "29",
      date: "07/08/24",
    },
    [DeptsEnum.CHOIR]: { dept: DeptsEnum.CHOIR, attendance: "49", date: "07/08/24" },
    [DeptsEnum.JESUS_POLIE]: {
      dept: DeptsEnum.JESUS_POLIE,
      attendance: "17",
      date: "07/08/24",
    },
    [DeptsEnum.PROTOCOL]: {
      dept: DeptsEnum.PROTOCOL,
      attendance: "21",
      date: "07/08/24",
    },
    [DeptsEnum.SANITATION]: {
      dept: DeptsEnum.SANITATION,
      attendance: "24",
      date: "07/08/24",
    },
    [DeptsEnum.USHERING]: {
      dept: DeptsEnum.USHERING,
      attendance: "23",
      date: "07/08/24",
    },
    [DeptsEnum.TEACHERS]: {
      dept: DeptsEnum.TEACHERS,
      attendance: "24",
      date: "07/08/24",
    },
  },
  {
    [DeptsEnum.MEDIA_AND_TECHNICAL]: {
      dept: DeptsEnum.MEDIA_AND_TECHNICAL,
      attendance: "21",
      date: "01/08/24",
    },
    [DeptsEnum.CHOIR]: { dept: DeptsEnum.CHOIR, attendance: "53", date: "01/08/24" },
    [DeptsEnum.JESUS_POLIE]: {
      dept: DeptsEnum.JESUS_POLIE,
      attendance: "15",
      date: "01/08/24",
    },
    [DeptsEnum.PROTOCOL]: {
      dept: DeptsEnum.PROTOCOL,
      attendance: "25",
      date: "01/08/24",
    },
    [DeptsEnum.SANITATION]: {
      dept: DeptsEnum.SANITATION,
      attendance: "23",
      date: "01/08/24",
    },
    [DeptsEnum.USHERING]: {
      dept: DeptsEnum.USHERING,
      attendance: "22",
      date: "01/08/24",
    },
    [DeptsEnum.TEACHERS]: {
      dept: DeptsEnum.TEACHERS,
      attendance: "27",
      date: "01/08/24",
    },
  },
];

export const deptData = [
  { total: "30", dept: DeptsEnum.MEDIA_AND_TECHNICAL, male: "20", female: "20" },
  { total: "58", dept: DeptsEnum.CHOIR, male: "20", female: "38" },
  { total: "39", dept: DeptsEnum.USHERING, male: "19", female: "20" },
  { total: "27", dept: DeptsEnum.PROTOCOL, male: "15", female: "12" },
  { total: "30", dept: DeptsEnum.SANITATION, male: "13", female: "17" },
  { total: "32", dept: DeptsEnum.TEACHERS, male: "20", female: "12" },
  { total: "18", dept: DeptsEnum.JESUS_POLIE, male: "11", female: "7" },
];

export const bottomCardsData = [
  { title: "15", subtititle: "People in Follow-Up List" },
  { title: "10", subtititle: "Unread Testimonies" },
  { title: "13", subtititle: "Unread Prayer Requests" },
  { title: "23", subtititle: "Total Number of House Fellowship Centers" },
];

export const attendanceInitData = [
  { name: "bar", attendance: "0" },
  { name: "bar", attendance: "0" },
  { name: "bar", attendance: "0" },
  { name: "bar", attendance: "0" },
  { name: "bar", attendance: "0" },
];