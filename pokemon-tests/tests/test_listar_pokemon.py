from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

def test_listar_pokemon():
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

    driver.get("http://localhost:5001/pokemons")
    driver.maximize_window()

    titulo = driver.find_element(By.TAG_NAME, "h1").text
    assert "Administrar Pokemones" in titulo

    boton_agregar = driver.find_element(By.XPATH, "//a[contains(text(), 'Agregar Pokemon')]")
    assert boton_agregar.is_displayed()

    driver.save_screenshot("tests/screenshots/listado.png")

    driver.quit()
