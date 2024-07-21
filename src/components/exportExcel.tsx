'use client'

import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

// 使用するファイルの例
import { FormData } from '@/components/medicalVisitForm';

const ExportExcel = (data: FormData) => {
  const [excelData, setExcelData] = useState<any>(null);

  useEffect(() => {
    fetch('/book1.xlsx')
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        const workbook = XLSX.read(buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // データをエクセルシートに追加
        const dataToWrite = [
          { A: data.visitDate, C: data.details } // B列とD列にデータを設定
        ];
        XLSX.utils.sheet_add_json(sheet, dataToWrite, { skipHeader: true, origin: "B2" });

        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        setExcelData(jsonData);
      });
  }, []);

  return (
    <div>
      <h2>エクセルのプレビュー</h2>
      {excelData && Array.isArray(excelData) && (
        <table>
          <thead>
            <tr>
              {excelData[0].map((header: string, index: number) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {excelData.slice(1).map((row: any[], rowIndex: number) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default ExportExcel;
