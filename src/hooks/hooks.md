# Usage 

## useGetData
        const { data, isLoading } = useGetData({
        queryKey: ['users'],
        url: '/api/users',
        }); 

## usePostData
        const { data, isLoading } = usePostData({
        queryKey: ['users'],
        url: '/api/users',
        payload: {
            name: 'John Doe',
            email: 'john.doe@example.com',
        },
        });
