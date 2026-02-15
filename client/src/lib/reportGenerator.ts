import { jsPDF } from 'jspdf';

export interface CalculationReport {
  calculatorName: string;
  calculatorType: string;
  timestamp: string;
  inputs: Record<string, { value: number | string; unit: string }>;
  outputs: Record<string, { value: number | string; unit: string }>;
  formula: string;
  explanation: string;
  realWorldScenario: string;
  safetyWarnings: string[];
  measurementGuide: string;
  relatedCalculators: string[];
  verificationSteps: string[];
}

export interface ComparisonReport {
  calculation1: CalculationReport;
  calculation2: CalculationReport;
  timestamp: string;
  comparisonNotes: string;
}

const setFont = (doc: any, style: string) => {
  doc.setFont(undefined, style);
};

const setTextColor = (doc: any, r: number, g: number, b: number) => {
  doc.setTextColor(r, g, b);
};

export function generateCalculationReport(data: CalculationReport): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPosition = 10;

  // Header
  doc.setFillColor(6, 182, 212); // Cyan
  doc.rect(0, 0, pageWidth, 30, 'F');
  
  setTextColor(doc, 255, 255, 255);
  doc.setFontSize(24);
  setFont(doc, 'bold');
  doc.text('ELECTRONICS CALCULATION REPORT', pageWidth / 2, 15, { align: 'center' });
  
  doc.setFontSize(10);
  setFont(doc, 'normal');
  doc.text(`Generated: ${data.timestamp}`, pageWidth / 2, 23, { align: 'center' });

  yPosition = 35;

  // Calculator Info
  setTextColor(doc, 0, 0, 0);
  doc.setFontSize(14);
  setFont(doc, 'bold');
  doc.text(`Calculator: ${data.calculatorName}`, 10, yPosition);
  yPosition += 8;

  doc.setFontSize(11);
  setFont(doc, 'normal');
  doc.text(`Type: ${data.calculatorType}`, 10, yPosition);
  yPosition += 10;

  // Real-World Scenario
  doc.setFontSize(12);
  setFont(doc, 'bold');
  setTextColor(doc, 6, 182, 212);
  doc.text('🌍 Real-World Scenario:', 10, yPosition);
  yPosition += 6;

  doc.setFontSize(10);
  setFont(doc, 'normal');
  setTextColor(doc, 0, 0, 0);
  const scenarioLines = doc.splitTextToSize(data.realWorldScenario, pageWidth - 20);
  doc.text(scenarioLines, 10, yPosition);
  yPosition += scenarioLines.length * 5 + 5;

  // Inputs
  doc.setFontSize(12);
  setFont(doc, 'bold');
  setTextColor(doc, 6, 182, 212);
  doc.text('📥 Inputs:', 10, yPosition);
  yPosition += 6;

  doc.setFontSize(10);
  setFont(doc, 'normal');
  setTextColor(doc, 0, 0, 0);
  Object.entries(data.inputs).forEach(([key, input]) => {
    doc.text(`• ${key}: ${input.value} ${input.unit}`, 15, yPosition);
    yPosition += 5;
  });
  yPosition += 3;

  // Formula
  doc.setFontSize(12);
  setFont(doc, 'bold');
  setTextColor(doc, 6, 182, 212);
  doc.text('📐 Formula:', 10, yPosition);
  yPosition += 6;

  doc.setFontSize(10);
  setFont(doc, 'normal');
  setTextColor(doc, 0, 0, 0);
  const formulaLines = doc.splitTextToSize(data.formula, pageWidth - 20);
  doc.text(formulaLines, 10, yPosition);
  yPosition += formulaLines.length * 5 + 5;

  // Outputs
  doc.setFontSize(12);
  setFont(doc, 'bold');
  setTextColor(doc, 6, 182, 212);
  doc.text('📤 Results:', 10, yPosition);
  yPosition += 6;

  doc.setFontSize(11);
  setFont(doc, 'bold');
  setTextColor(doc, 34, 197, 94); // Green
  Object.entries(data.outputs).forEach(([key, output]) => {
    doc.text(`• ${key}: ${output.value} ${output.unit}`, 15, yPosition);
    yPosition += 6;
  });
  yPosition += 3;

  // Explanation
  doc.setFontSize(10);
  setFont(doc, 'normal');
  setTextColor(doc, 0, 0, 0);
  const explanationLines = doc.splitTextToSize(`Explanation: ${data.explanation}`, pageWidth - 20);
  doc.text(explanationLines, 10, yPosition);
  yPosition += explanationLines.length * 4 + 5;

  // Check if we need a new page
  if (yPosition > pageHeight - 40) {
    doc.addPage();
    yPosition = 10;
  }

  // Measurement Guide
  doc.setFontSize(12);
  setFont(doc, 'bold');
  setTextColor(doc, 6, 182, 212);
  doc.text('📏 How to Measure:', 10, yPosition);
  yPosition += 6;

  doc.setFontSize(10);
  setFont(doc, 'normal');
  setTextColor(doc, 0, 0, 0);
  const measurementLines = doc.splitTextToSize(data.measurementGuide, pageWidth - 20);
  doc.text(measurementLines, 10, yPosition);
  yPosition += measurementLines.length * 4 + 5;

  // Safety Warnings
  if (data.safetyWarnings.length > 0) {
    doc.setFontSize(12);
    setFont(doc, 'bold');
    setTextColor(doc, 220, 38, 38); // Red
    doc.text('⚠️ Safety Warnings:', 10, yPosition);
    yPosition += 6;

    doc.setFontSize(10);
    setFont(doc, 'normal');
    setTextColor(doc, 0, 0, 0);
    data.safetyWarnings.forEach(warning => {
      const warningLines = doc.splitTextToSize(`• ${warning}`, pageWidth - 20);
      doc.text(warningLines, 10, yPosition);
      yPosition += warningLines.length * 4 + 2;
    });
    yPosition += 3;
  }

  // Verification Steps
  if (data.verificationSteps.length > 0) {
    if (yPosition > pageHeight - 40) {
      doc.addPage();
      yPosition = 10;
    }

    doc.setFontSize(12);
    setFont(doc, 'bold');
    setTextColor(doc, 6, 182, 212);
    doc.text('✓ Verification Steps:', 10, yPosition);
    yPosition += 6;

    doc.setFontSize(10);
    setFont(doc, 'normal');
    setTextColor(doc, 0, 0, 0);
    data.verificationSteps.forEach((step, idx) => {
      const stepLines = doc.splitTextToSize(`${idx + 1}. ${step}`, pageWidth - 20);
      doc.text(stepLines, 10, yPosition);
      yPosition += stepLines.length * 4 + 2;
    });
  }

  // Footer
  doc.setFontSize(8);
  setTextColor(doc, 128, 128, 128);
  doc.text(
    `ElectroLearn © 2026 | Page ${doc.internal.pages.length}`,
    pageWidth / 2,
    pageHeight - 5,
    { align: 'center' }
  );

  return doc;
}

export function generateComparisonReport(data: ComparisonReport): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  let yPosition = 10;

  // Header
  doc.setFillColor(6, 182, 212);
  doc.rect(0, 0, pageWidth, 30, 'F');
  
  setTextColor(doc, 255, 255, 255);
  doc.setFontSize(24);
  setFont(doc, 'bold');
  doc.text('CALCULATOR COMPARISON REPORT', pageWidth / 2, 15, { align: 'center' });
  
  doc.setFontSize(10);
  setFont(doc, 'normal');
  doc.text(`Generated: ${data.timestamp}`, pageWidth / 2, 23, { align: 'center' });

  yPosition = 35;

  // Comparison Notes
  setTextColor(doc, 0, 0, 0);
  doc.setFontSize(12);
  setFont(doc, 'bold');
  setTextColor(doc, 6, 182, 212);
  doc.text('📝 Comparison Notes:', 10, yPosition);
  yPosition += 6;

  doc.setFontSize(10);
  setFont(doc, 'normal');
  setTextColor(doc, 0, 0, 0);
  const notesLines = doc.splitTextToSize(data.comparisonNotes, pageWidth - 20);
  doc.text(notesLines, 10, yPosition);
  yPosition += notesLines.length * 4 + 8;

  // Calculation 1
  doc.setFontSize(14);
  setFont(doc, 'bold');
  setTextColor(doc, 6, 182, 212);
  doc.text(`Calculation 1: ${data.calculation1.calculatorName}`, 10, yPosition);
  yPosition += 8;

  doc.setFontSize(10);
  setFont(doc, 'normal');
  setTextColor(doc, 0, 0, 0);
  doc.text(`Inputs:`, 10, yPosition);
  yPosition += 5;
  Object.entries(data.calculation1.inputs).forEach(([key, input]) => {
    doc.text(`• ${key}: ${input.value} ${input.unit}`, 15, yPosition);
    yPosition += 5;
  });

  setFont(doc, 'bold');
  doc.text(`Results:`, 10, yPosition);
  yPosition += 5;
  setFont(doc, 'normal');
  Object.entries(data.calculation1.outputs).forEach(([key, output]) => {
    doc.text(`• ${key}: ${output.value} ${output.unit}`, 15, yPosition);
    yPosition += 5;
  });

  yPosition += 5;

  // Calculation 2
  doc.setFontSize(14);
  setFont(doc, 'bold');
  setTextColor(doc, 6, 182, 212);
  doc.text(`Calculation 2: ${data.calculation2.calculatorName}`, 10, yPosition);
  yPosition += 8;

  doc.setFontSize(10);
  setFont(doc, 'normal');
  setTextColor(doc, 0, 0, 0);
  doc.text(`Inputs:`, 10, yPosition);
  yPosition += 5;
  Object.entries(data.calculation2.inputs).forEach(([key, input]) => {
    doc.text(`• ${key}: ${input.value} ${input.unit}`, 15, yPosition);
    yPosition += 5;
  });

  setFont(doc, 'bold');
  doc.text(`Results:`, 10, yPosition);
  yPosition += 5;
  setFont(doc, 'normal');
  Object.entries(data.calculation2.outputs).forEach(([key, output]) => {
    doc.text(`• ${key}: ${output.value} ${output.unit}`, 15, yPosition);
    yPosition += 5;
  });

  return doc;
}

export function downloadPDF(doc: jsPDF, filename: string) {
  (doc as any).save(filename);
}
