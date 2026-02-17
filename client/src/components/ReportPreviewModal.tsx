import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Download, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalculationReport, ComparisonReport, downloadPDF, generateCalculationReport, generateComparisonReport } from '@/lib/reportGenerator';
import { jsPDF } from 'jspdf';

interface ReportPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: CalculationReport | ComparisonReport | null;
  isComparison?: boolean;
}

export function ReportPreviewModal({
  isOpen,
  onClose,
  report,
  isComparison = false
}: ReportPreviewModalProps) {
  if (!report) return null;

  const handleDownload = () => {
    let doc: jsPDF;
    let filename: string;

    if (isComparison) {
      const comparisonReport = report as ComparisonReport;
      doc = generateComparisonReport(comparisonReport);
      filename = `comparison-report-${new Date().getTime()}.pdf`;
    } else {
      const calcReport = report as CalculationReport;
      doc = generateCalculationReport(calcReport);
      filename = `calculation-report-${new Date().getTime()}.pdf`;
    }

    downloadPDF(doc, filename);
  };

  const renderCalculationReport = (report: CalculationReport) => (
    <div className="space-y-6">
      {/* Calculator Info */}
      <div className="bg-slate-800 p-4 rounded border border-slate-700">
        <p className="text-sm font-semibold text-slate-300 mb-2">📊 Calculator</p>
        <p className="text-lg font-bold text-cyan-400">{report.calculatorName}</p>
        <p className="text-sm text-slate-400 mt-1">{report.timestamp}</p>
      </div>

      {/* Real-World Scenario */}
      <div className="bg-blue-900/20 border border-blue-500/50 p-4 rounded">
        <p className="text-sm font-semibold text-blue-300 mb-2">🌍 Real-World Scenario</p>
        <p className="text-sm text-slate-300">{report.realWorldScenario}</p>
      </div>

      {/* Inputs */}
      <div className="bg-slate-800 p-4 rounded border border-slate-700">
        <p className="text-sm font-semibold text-slate-300 mb-3">📥 Inputs</p>
        <div className="space-y-2">
          {Object.entries(report.inputs).map(([key, input]) => (
            <div key={key} className="flex justify-between items-center">
              <span className="text-slate-400">{key}</span>
              <span className="text-cyan-400 font-semibold">
                {input.value} {input.unit}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Formula */}
      <div className="bg-purple-900/20 border border-purple-500/50 p-4 rounded">
        <p className="text-sm font-semibold text-purple-300 mb-2">📐 Formula</p>
        <p className="text-sm font-mono text-slate-300">{report.formula}</p>
      </div>

      {/* Results */}
      <div className="bg-green-900/20 border border-green-500/50 p-4 rounded">
        <p className="text-sm font-semibold text-green-300 mb-3">✓ Results</p>
        <div className="space-y-2">
          {Object.entries(report.outputs).map(([key, output]) => (
            <div key={key} className="flex justify-between items-center">
              <span className="text-slate-300">{key}</span>
              <span className="text-green-400 font-bold text-lg">
                {output.value} {output.unit}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Explanation */}
      <div className="bg-slate-800 p-4 rounded border border-slate-700">
        <p className="text-sm font-semibold text-slate-300 mb-2">💡 Explanation</p>
        <p className="text-sm text-slate-400">{report.explanation}</p>
      </div>

      {/* Measurement Guide */}
      <div className="bg-slate-800 p-4 rounded border border-slate-700">
        <p className="text-sm font-semibold text-slate-300 mb-2">📏 How to Measure</p>
        <p className="text-sm text-slate-400">{report.measurementGuide}</p>
      </div>

      {/* Safety Warnings */}
      {report.safetyWarnings.length > 0 && (
        <div className="bg-red-900/20 border border-red-500/50 p-4 rounded">
          <p className="text-sm font-semibold text-red-300 mb-2">⚠️ Safety Warnings</p>
          <ul className="space-y-1">
            {report.safetyWarnings.map((warning, idx) => (
              <li key={idx} className="text-sm text-red-200">• {warning}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Verification Steps */}
      {report.verificationSteps.length > 0 && (
        <div className="bg-slate-800 p-4 rounded border border-slate-700">
          <p className="text-sm font-semibold text-slate-300 mb-2">✓ Verification Steps</p>
          <ol className="space-y-1">
            {report.verificationSteps.map((step, idx) => (
              <li key={idx} className="text-sm text-slate-400">
                {idx + 1}. {step}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );

  const renderComparisonReport = (report: ComparisonReport) => (
    <div className="space-y-6">
      {/* Comparison Notes */}
      <div className="bg-blue-900/20 border border-blue-500/50 p-4 rounded">
        <p className="text-sm font-semibold text-blue-300 mb-2">📝 Comparison Notes</p>
        <p className="text-sm text-slate-300">{report.comparisonNotes}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Calculation 1 */}
        <div className="space-y-3">
          <div className="bg-cyan-900/20 border border-cyan-500/50 p-3 rounded">
            <p className="text-sm font-semibold text-cyan-300">📊 Calculation 1</p>
            <p className="text-sm text-slate-400 mt-1">{report.calculation1.calculatorName}</p>
          </div>

          <div className="bg-slate-800 p-3 rounded border border-slate-700">
            <p className="text-sm font-semibold text-slate-300 mb-2">Inputs</p>
            <div className="space-y-1">
              {Object.entries(report.calculation1.inputs).map(([key, input]) => (
                <div key={key} className="text-sm">
                  <span className="text-slate-400">{key}:</span>
                  <span className="text-cyan-400 ml-1">{input.value} {input.unit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-green-900/20 border border-green-500/50 p-3 rounded">
            <p className="text-sm font-semibold text-green-300 mb-2">Results</p>
            <div className="space-y-1">
              {Object.entries(report.calculation1.outputs).map(([key, output]) => (
                <div key={key} className="text-sm">
                  <span className="text-slate-300">{key}:</span>
                  <span className="text-green-400 font-bold ml-1">{output.value} {output.unit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Calculation 2 */}
        <div className="space-y-3">
          <div className="bg-purple-900/20 border border-purple-500/50 p-3 rounded">
            <p className="text-sm font-semibold text-purple-300">📊 Calculation 2</p>
            <p className="text-sm text-slate-400 mt-1">{report.calculation2.calculatorName}</p>
          </div>

          <div className="bg-slate-800 p-3 rounded border border-slate-700">
            <p className="text-sm font-semibold text-slate-300 mb-2">Inputs</p>
            <div className="space-y-1">
              {Object.entries(report.calculation2.inputs).map(([key, input]) => (
                <div key={key} className="text-sm">
                  <span className="text-slate-400">{key}:</span>
                  <span className="text-purple-400 ml-1">{input.value} {input.unit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-green-900/20 border border-green-500/50 p-3 rounded">
            <p className="text-sm font-semibold text-green-300 mb-2">Results</p>
            <div className="space-y-1">
              {Object.entries(report.calculation2.outputs).map(([key, output]) => (
                <div key={key} className="text-sm">
                  <span className="text-slate-300">{key}:</span>
                  <span className="text-green-400 font-bold ml-1">{output.value} {output.unit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-cyan-500/30 rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-cyan-500/30 p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-cyan-400" />
                <h2 className="text-2xl font-bold text-cyan-400">
                  {isComparison ? 'Comparison Report' : 'Calculation Report'}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-700 rounded-lg transition"
              >
                <X className="w-5 h-5 text-slate-400 hover:text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {isComparison
                ? renderComparisonReport(report as ComparisonReport)
                : renderCalculationReport(report as CalculationReport)}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-gradient-to-r from-slate-900 to-slate-800 border-t border-cyan-500/30 p-4 flex gap-3 justify-end">
              <Button
                onClick={onClose}
                className="bg-slate-700 hover:bg-slate-600 text-white"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDownload}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white gap-2"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
