'use client';

import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';


export interface FormData {
  visitDate: string;
  details: string;
  observation: string;
  medications: string;
  nextVisitDate: string;
  other: string;
}

const MedicalVisitForm = () => {
  const { control, handleSubmit, getValues } = useForm<FormData>();
  const [isClient, setIsClient] = useState(false);
  const [routerReady, setRouterReady] = useState(false);
  const router = useRouter();
  const [submittedData, setSubmittedData] = useState<FormData>();

  useEffect(() => {
    setIsClient(true);
    if (router) {
      setRouterReady(true);
    }
  }, [router]);


  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post('http://localhost:8080/api/submit', data);
      console.log('Success:', response.data);
      router.push("/result")
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!isClient) {
    return null; 
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>診察日</label>
        <Controller
          name="visitDate"
          control={control}
          render={({ field }) => (
            <input type="date" {...field} />
          )}
        />
      </div>
      <div>
        <label>診察内容</label>
        <Controller
          name="details"
          control={control}
          render={({ field }) => (
            <textarea {...field} rows={4} />
          )}
        />
      </div>
      <div>
        <label>医師の見解</label>
        <Controller
          name="observation"
          control={control}
          render={({ field }) => (
            <input type="text" {...field} />
          )}
        />
      </div>
      <div>
        <label>処方された薬</label>
        <Controller
          name="medications"
          control={control}
          render={({ field }) => (
            <input type="text" {...field} />
          )}
        />
      </div>
      <div>
        <label>次回受診日</label>
        <Controller
          name="nextVisitDate"
          control={control}
          render={({ field }) => (
            <input type="date" {...field} />
          )}
        />
      </div>
      <div>
        <label>備考欄(※)</label>
        <Controller
          name="other"
          control={control}
          render={({ field }) => (
            <input type="text" {...field} />
          )}
        />
      </div>
      <button type="submit">送信</button>
    </form>
  );
};

export default MedicalVisitForm;
