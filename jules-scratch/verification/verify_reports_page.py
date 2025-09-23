from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Log in
    page.goto("http://localhost:3000/")
    page.wait_for_load_state("networkidle")
    email_input = page.get_by_role("textbox", name="Email address")
    expect(email_input).to_be_visible()
    email_input.fill("testuser@test.com")

    password_input = page.get_by_label("Password")
    expect(password_input).to_be_visible()
    password_input.fill("password")

    login_button = page.get_by_role("button", name="Log in")
    expect(login_button).to_be_enabled()
    login_button.click()

    page.wait_for_load_state("networkidle")


    # Navigate to the ponds page
    page.goto("http://localhost:3000/account/ponds")
    page.wait_for_load_state("networkidle")


    # Click on the "Reports" card
    reports_link = page.get_by_role("link", name="Reports")
    expect(reports_link).to_be_visible()
    reports_link.click()
    page.wait_for_load_state("networkidle")


    # Verify that the reports page is displayed
    expect(page).to_have_url("http://localhost:3000/account/reports")
    expect(page.get_by_role("heading", name="Reports")).to_be_visible()

    # Take a screenshot of the reports page
    page.screenshot(path="jules-scratch/verification/reports_page_history_tab.png")

    # Switch to the "Report" tab
    report_button = page.get_by_role("button", name="Report")
    expect(report_button).to_be_visible()
    report_button.click()
    page.wait_for_load_state("networkidle")


    # Take a screenshot of the report tab
    page.screenshot(path="jules-scratch/verification/reports_page_report_tab.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
