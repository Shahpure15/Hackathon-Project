from fpdf import FPDF
import os

def generate_report(url, results, risk_score):
    """
    Generates a simple PDF report from the scan results.
    Returns the local file path (reportUrl) so the frontend can download it.
    """
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", "B", 16)

    pdf.cell(0, 10, "Security Analysis Report", ln=1, align="C")
    pdf.set_font("Arial", size=12)
    pdf.cell(0, 10, f"Website: {url}", ln=1)
    pdf.cell(0, 10, f"Risk Score: {risk_score}", ln=1)

    pdf.ln(5)
    for test in results:
        pdf.set_font("Arial", "B", 12)
        pdf.cell(0, 8, f"{test['name']}", ln=1)
        pdf.set_font("Arial", size=10)
        pdf.multi_cell(0, 6, f"Status: {test['status']}\nDetails: {test['details']}")
        pdf.ln(3)

    # Ensure 'reports' folder exists
    report_dir = os.path.join(os.getcwd(), "reports")
    if not os.path.exists(report_dir):
        os.makedirs(report_dir)

    report_path = os.path.join(report_dir, "report.pdf")
    pdf.output(report_path)

    return report_path