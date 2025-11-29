from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time

def test_validaciones_pokemon():
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
    driver.get("http://localhost:5001/create-pokemon")
    driver.maximize_window()

    boton = driver.find_element(By.XPATH, "//button[@type='submit']")
    boton.click()

    time.sleep(1)

    assert "create-pokemon" in driver.current_url

    errores = driver.find_elements(By.XPATH, "//div[@class='alert alert-danger']//li")
    assert len(errores) > 0

    driver.save_screenshot("tests/screenshots/validaciones.png")

    driver.quit()
