import React from 'react';

const DashboardPage = () => {
    return (
        <div className='mt-20 p-4 max-w-[1250px] mx-auto'>
            <div>
                <h2 className="text-2xl md:text-4xl font-bold text-center text-orange-600 mb-4 py-2">Welcome to Dashboard Page</h2>
                <div className='flex items-center justify-between'>
                    <div className='md:w-1/5 min-h-96 bg-gray-400'>
                    Sidebar
                    </div>
                    <div className='md:w-4/5 min-h-96 bg-gray-500'>Main menu</div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;