export interface studentInfo{
    studentDetails: {
        id: number
        name: string,
        email: string,
        password: string,
        phone: number
    },
    attendenceDetails: [
        {
            id: number,
            studentId: number,
            date: Date,
            Status: string
        }
    ]
}