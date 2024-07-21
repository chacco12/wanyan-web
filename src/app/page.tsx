'use client'


import MedicalVisitForm from '@/components/medicalVisitForm';



const HomePage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <h1>診察情報入力フォーム</h1>
      <MedicalVisitForm />
    </div>
  );
};

export default HomePage;
