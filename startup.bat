
set my_path=%cd%
@echo %my_path%


start "Flask server" CMD /k "cd %my_path%\venv\Scripts & activate & cd %my_path% & code . & cd %my_path% & flask run" 
start "Destiny-Focus Workspace" CMD /k "cd %my_path%\venv\Scripts & activate & cd %my_path%" 
start "NPM React workspace" CMD /k "cd %my_path%\venv\Scripts & activate & cd ../../ & npm run webpack-watch"
