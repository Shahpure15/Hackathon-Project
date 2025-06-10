import subprocess

def run_nmap_scan(url):
    """
    Runs a quick Nmap scan on the target URL.
    """
    try:
        # '-F' = Fast scan of common ports
        result = subprocess.run(["nmap", "-F", url], capture_output=True, text=True, timeout=30)
        if result.returncode == 0:
            return result.stdout
        else:
            return f"Error running Nmap scan: {result.stderr}"
    except Exception as e:
        return f"Exception in Nmap scan: {str(e)}"