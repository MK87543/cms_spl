import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const MaintenanceReport = () => {
    const [reportData, setReportData] = useState({
        facility: 'LKH Feldkirch',
        inspectionNumber: 'LKS/KD1BSK/Z01',
        dateFrom: '2025-01-10',
        dateTo: '2025-09-25',
        inspector: 'Thomas Gürtl',
        items: [
            {
                id: 1, component: 'Brandschutzklappen geprüft nach ÖNORM H6031:2014', subItems: [
                    { name: 'Übereinsammlung mit den letztgültigen Bestandsplänen', status: '✓' },
                    { name: 'Feststellung von relevanten baulichen Veränderungen oder Anlagenänderungen', status: '✓' },
                    { name: 'Brandschutzklappenaufführung gemäß Prüfbericht (K50) oder Klassifizierungsbericht / Leistungserklärung (E80)', status: '✓' },
                    { name: 'Einbau gemäß ÖNORM H 6031 und Herstellerangaben', status: '✓' },
                    { name: 'Einbau von flexiblen Stützen', status: '✓' },
                    { name: 'Abschluss zwischen BSK und Baukörper (z.B. Weichschott Mörtelscot etc.)', status: '✗' },
                    { name: 'Klassifizierung "K60" oder "E90"', status: '✓' },
                    { name: 'ÖA-Kennzeichnung (K30; ab 1.1.2024) oder CE-Kennzeichnung (E90: 1.9.2024)', status: '✓' },
                    { name: 'Angabe des Herstellers (Aufkleber, Typenschild, etc.)', status: '✓' },
                    { name: 'Klappenidentifikation innerhalb der Anlagen (z.B. Bezeichnungsschälder)', status: '✓' },
                    { name: 'Korrosion / Verschmutzung (außen und innen)', status: '✓' },
                    { name: 'Zustand des Klappenblattes und der Dichtungen (z.B. Inttenmäßige Dichtung) prüfen (innen)', status: '✓' },
                    { name: 'Eindschäller (mech. BSK)', status: '✓' },
                    { name: 'Motor / Antrieb und Anschlusses', status: '✓' },
                    { name: 'Klemmrissteu und Verkabelung (im Bereich der BSK)', status: '✓' },
                    { name: 'Meldesteus dreimaliges Schließen der Klappe (in Anwesenheit vor Ort)', status: '✓' },
                    { name: 'Einwandthees / leichtgängiges Öffnen und Schließen des Verschlusselements (vs./akust. Beurtelung)', status: '✓' },
                    { name: 'Elektrische Fernauslösung und Öffnen der Klappe über die zentrale Brandmeldeanlage', status: '✓' },
                    { name: 'Kontrolle der optischen Anzeige "geschlossen" und "offen" -an der BSK. Überprüfung der Meldung der Endschalter und sämtlicher Kontrollanzeigen', status: '✓' },
                    { name: 'Überprüfung der Hilfsfunktion in der Sicherheitsleitung bzw. Fixierung des Verschlusses nach Erreichen der Sicherheitsstellung', status: '✓' },
                ]
            },
            { id: 2, component: 'LKS/KD1BSK/Z01', status: 'Offen' },
        ],
    });

    const generatePDF = () => {
        const pdf = new jsPDF('portrait', 'mm', 'a4');
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const margin = 10;

        let yPosition = margin;

        // Header function
        const addHeader = () => {
            yPosition = margin;
            pdf.setFontSize(9);
            pdf.setTextColor(100, 100, 100);
            pdf.text('Ender Klimatechnik Wartungsbericht', margin, yPosition);
            pdf.text('Wartungsgegenstand: LKH Feldkirch 2025 - 25.09.2025', margin, yPosition + 4);
            return yPosition + 15;
        };

        // Page 1: Main Report
        yPosition = addHeader();

        pdf.setFontSize(16);
        pdf.setTextColor(0, 0, 0);
        pdf.text('Wartungsbericht LKH Feldkirch 2025', pageWidth / 2, yPosition, { align: 'center' });
        yPosition += 15;

        // Report details
        const firstItem = reportData.items?.[0] ?? { component: '', subItems: [] as any[] };
        const details = [
            ['Wartungskomponente', firstItem.component],
            ['Wartung durchgeführt von', reportData.inspector],
            ['Wartung durchgeführt am', reportData.inspectionNumber],
            ['Status', 'Mangelhaft'],
        ];

        (pdf as any).autoTable({
            startY: yPosition,
            head: [['Feld', 'Wert']],
            body: details,
            margin: margin,
            styles: { fontSize: 10, cellPadding: 5 },
            headStyles: { fillColor: [200, 200, 200], textColor: 0, fontStyle: 'bold' },
            bodyStyles: { textColor: 0, lineColor: 200 },
        });

        yPosition = (pdf as any).lastAutoTable.finalY + 10;

        // Main checklist table
        const checklistBody = (firstItem.subItems ?? []).map(item => [
            item.name,
            item.status === '✓' ? '✓' : item.status === '✗' ? '✗' : '',
        ]);

        (pdf as any).autoTable({
            startY: yPosition,
            head: [['Prüfpunkte', 'Status']],
            body: checklistBody,
            margin: margin,
            styles: { fontSize: 9, cellPadding: 4, halign: 'left', valign: 'top' },
            headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold' },
            bodyStyles: { textColor: 50, lineColor: 200 },
            columnStyles: {
                0: { cellWidth: 140 },
                1: { cellWidth: 20, halign: 'center' },
            },
            rowPageBreak: 'avoid',
            didDrawPage: (data) => {
                // Footer
                const pageNum = pdf.internal.pages.length - 1;
                pdf.setFontSize(9);
                pdf.setTextColor(150, 150, 150);
                pdf.text(`Seite ${pageNum}`, pageWidth / 2, pageHeight - 7, { align: 'center' });
            },
        });

        // Page 2: Open Items
        pdf.addPage();
        yPosition = addHeader();

        (pdf as any).autoTable({
            startY: yPosition,
            head: [['Wartungskomponente', 'Wartung durchgeführt von', 'Wartung durchgeführt am', 'Status', 'Bemerkung']],
            body: [['LKS/KD1BSK/Z01', '', '', 'Offen', '']],
            margin: margin,
            styles: { fontSize: 10, cellPadding: 5 },
            headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold' },
            bodyStyles: { textColor: 0, lineColor: 200 },
            columnStyles: {
                0: { cellWidth: 35 },
                1: { cellWidth: 35 },
                2: { cellWidth: 35 },
                3: { cellWidth: 25 },
                4: { cellWidth: 30 },
            },
            rowPageBreak: 'avoid',
            didDrawPage: (data) => {
                const pageNum = pdf.internal.pages.length - 1;
                pdf.setFontSize(9);
                pdf.setTextColor(150, 150, 150);
                pdf.text(`Seite ${pageNum}`, pageWidth / 2, pageHeight - 7, { align: 'center' });
            },
        });

        // Page 3: Summary Chart
        pdf.addPage();
        yPosition = addHeader();

        pdf.setFontSize(14);
        pdf.text('Status Zusammenfassung', pageWidth / 2, yPosition, { align: 'center' });
        yPosition += 15;

        // Summary table
        const summaryData = [
            ['Mangelhaft', '1'],
            ['Offen', '1'],
        ];

        (pdf as any).autoTable({
            startY: yPosition,
            head: [['Status', 'Anzahl']],
            body: summaryData,
            margin: margin,
            styles: { fontSize: 11, cellPadding: 6, halign: 'center' },
            headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold' },
            bodyStyles: { textColor: 0, lineColor: 200 },
            columnStyles: {
                0: { cellWidth: 100 },
                1: { cellWidth: 60 },
            },
        });

        pdf.save('Wartungsbericht_LKH_Feldkirch_2025.pdf');
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>📋 Wartungsbericht Generator</h1>

            <button
                onClick={generatePDF}
                style={{
                    padding: '12px 24px',
                    fontSize: '16px',
                    backgroundColor: '#2980b9',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    marginBottom: '20px',
                }}
            >
                📥 PDF generieren
            </button>

            {/* Input Form */}
            <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '4px', marginBottom: '20px' }}>
                <h3>Berichtsdaten anpassen:</h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div>
                        <label>Inspekteur:</label>
                        <input
                            type="text"
                            value={reportData.inspector}
                            onChange={(e) => setReportData({ ...reportData, inspector: e.target.value })}
                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                        />
                        <div>
                        <label>Komponente:</label>
                        <input
                            type="text"
                            value={reportData.items?.[0]?.component ?? ''}
                            onChange={(e) => {
                                setReportData(prev => {
                                    const newItems = [...(prev.items ?? [])];
                                    if (!newItems[0]) {
                                        newItems[0] = { id: Date.now(), component: e.target.value, subItems: [] };
                                    } else {
                                        newItems[0] = { ...newItems[0], component: e.target.value };
                                    }
                                    return { ...prev, items: newItems };
                                });
                            }}
                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                        />
                    </div>
                    </div>
                </div>
            </div>

            {/* Preview Section */}
            <div style={{
                width: '210mm',
                margin: '0 auto',
                padding: '20mm',
                backgroundColor: '#fff',
                boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                fontSize: '10px',
                lineHeight: '1.4',
            }}>
                        <tr style={{ backgroundColor: '#e0e0e0' }}>
                            <td style={{ padding: '6px', border: '1px solid #999', fontWeight: 'bold' }}>Wartungskomponente</td>
                            <td style={{ padding: '6px', border: '1px solid #999' }}>{reportData.items?.[0]?.component ?? '—'}</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '6px', border: '1px solid #999', fontWeight: 'bold' }}>Wartung durchgeführt von</td>
                            <td style={{ padding: '6px', border: '1px solid #999' }}>{reportData.inspector}</td>
                        </tr>
                        <tr style={{ backgroundColor: '#f9f9f9' }}>
                            <td style={{ padding: '6px', border: '1px solid #999', fontWeight: 'bold' }}>Wartung durchgeführt am</td>
                            <td style={{ padding: '6px', border: '1px solid #999' }}>{reportData.dateFrom}</td>
                        </tr>
                            <td style={{ padding: '6px', border: '1px solid #999', fontWeight: 'bold' }}>Wartung durchgeführt von</td>
                            <td style={{ padding: '6px', border: '1px solid #999' }}>Thomas Gürtl</td>
                        </tr>
                        <tr style={{ backgroundColor: '#f9f9f9' }}>
                            <td style={{ padding: '6px', border: '1px solid #999', fontWeight: 'bold' }}>Wartung durchgeführt am</td>
                            <td style={{ padding: '6px', border: '1px solid #999' }}>10.09.2025</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '6px', border: '1px solid #999', fontWeight: 'bold' }}>Status</td>
                            <td style={{ padding: '6px', border: '1px solid #999' }}>Mangelhaft</td>
                        </tr>
                    </tbody>
                </table>

                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px', fontSize: '8px' }}>
                        {(reportData.items?.[0]?.subItems ?? []).slice(0, 5).map((item, idx) => (
                            <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                                <td style={{ padding: '4px', border: '1px solid #ccc' }}>{item.name}</td>
                                <td style={{ padding: '4px', border: '1px solid #ccc', textAlign: 'center' }}>
                                    {item.status === '✓' ? '✓' : item.status === '✗' ? '✗' : ''}
                                </td>
                            </tr>
                        ))}
                            <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                                <td style={{ padding: '4px', border: '1px solid #ccc' }}>{item.name}</td>
                <p style={{ fontSize: '8px', color: '#999', marginTop: '10px' }}>... und {Math.max(((reportData.items?.[0]?.subItems ?? []).length - 5), 0)} weitere Punkte</p>
                                    {item.status === '✓' ? '✓' : item.status === '✗' ? '✗' : ''}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p style={{ fontSize: '8px', color: '#999', marginTop: '10px' }}>... und {reportData.items[0].subItems.length - 5} weitere Punkte</p>
            </div>
        </div>
    );
};

export default MaintenanceReport;
