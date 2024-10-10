export const paths = {
    overview: '/',
    auth:{
        self: '/auth',
        login: '/auth/login',
        register: '/auth/register',
        forgotPassword: '/auth/forgot-password',
        resetPassword: '/auth/reset-password',
    },
    profile: '/profile',
    student:{
        list: "/students",
        detail: (id: number) =>  `/student/detail/${id}`,
    },
    program: {
        list: '/programs',
    },
    course: {
        list: '/courses',
    },
};
