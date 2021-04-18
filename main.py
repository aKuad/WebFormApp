# encoding: UTF-8
#
# Form WebApp powerd by Flask
#
# Programmed: aKuad
#

# Modules importing
from flask import Flask, render_template, request


# Flask app construct
app = Flask(__name__)


# App routes
## Home
@app.route("/", methods=['GET'])
def rt_root():
  return render_template("home.html", page_titlehead="Form App")

## Form pages
@app.route("/form/<form_name>", methods=['GET'])
def rt_form(form_name):
  pagename_title_dic = {
    "gitservice": "Git サービスに関して"
  }
  try:
    return render_template("form_" + form_name + ".html",
                           page_titlehead=pagename_title_dic[form_name] + " - Form App",
                           page_titlebody=pagename_title_dic[form_name])
  except Exception as e:
    print(e)
    return render_template("error_404.html"), 404

## Form send
@app.route("/send", methods=['POST'])
def rt_send():
  print(request.get_json())
  return "POST"

## Receive test
@app.route("/test", methods=['POST', 'GET'])
def rt_test():
  print("--- Test access ---")
  print("-- Header")
  print(request.headers)
  print("-- URL args")
  print(request.args.to_dict())
  print("-- Body")
  print(request.get_data())
  return "Receive_ok"

## 404 error
@app.errorhandler(404)
def er_404():
  return render_template("error_404.html", page_titlehead="404 Not found - Form App")


# App run
if __name__ == "__main__":
  print(app.url_map)
  app.run(host="0.0.0.0", port="8080", debug=True)
