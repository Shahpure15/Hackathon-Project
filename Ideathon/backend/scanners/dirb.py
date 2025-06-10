import subprocess

def run_dirb_scan(url):
    """
    Runs a directory brute force to find hidden endpoints.
    Adjust 'small.txt' or path to a different wordlist as needed.
    """
    try:
        # Example with gobuster
        result = subprocess.run(
            ["gobuster", "dir", "-u", url, "-w", "small.txt"],
            capture_output=True,
            text=True,
            timeout=30
        )
        if result.returncode == 0:
            return result.stdout
        else:
            return f"Error running Directory Scan: {result.stderr}"
    except Exception as e:
        return f"Exception in Directory Scan: {str(e)}"