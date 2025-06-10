from flask import Blueprint, request, jsonify
from scanners import nmap, dirb, xss, csrf, sqli
from utils import report_generator

scan_bp = Blueprint('scan_bp', __name__)

@scan_bp.route('/scan', methods=['POST'])
def scan():
    data = request.get_json()
    url = data.get("url")

    if not url:
        return jsonify({"error": "No URL provided"}), 400

    results = []
    risk_score = 0

    # 1) Nmap Scan
    nmap_output = nmap.run_nmap_scan(url)
    results.append({
        "name": "Nmap Scan",
        "status": "Done",
        "details": nmap_output
    })

    # 2) Directory Brute Force
    dirb_output = dirb.run_dirb_scan(url)
    results.append({
        "name": "Directory Scan",
        "status": "Done",
        "details": dirb_output
    })

    # 3) XSS Test
    xss_status, xss_details = xss.run_xss_scan(url)
    results.append({
        "name": "XSS Test",
        "status": xss_status,
        "details": xss_details
    })
    risk_score += 30 if xss_status == "Vulnerable" else 0

    # 4) CSRF Test
    csrf_status, csrf_details = csrf.run_csrf_scan(url)
    results.append({
        "name": "CSRF Test",
        "status": csrf_status,
        "details": csrf_details
    })
    risk_score += 20 if csrf_status == "Vulnerable" else 0

    # 5) SQL Injection Test
    sqli_status, sqli_details = sqli.run_sqli_scan(url)
    results.append({
        "name": "SQL Injection",
        "status": sqli_status,
        "details": sqli_details
    })
    risk_score += 50 if sqli_status == "Vulnerable" else 0

    # Generate PDF Report
    report_url = report_generator.generate_report(url, results, risk_score)

    return jsonify({
        "results": results,
        "riskScore": risk_score,
        "reportUrl": report_url
    })