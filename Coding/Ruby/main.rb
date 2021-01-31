require 'tk'
#require 'httparty'

#response = HTTParty.get('https://spiderum.com')

#puts response.body, response.code, response.message, response.headers.inspect
require 'httparty'

root = TkRoot.new { title "Hello, World!" }

TkLabel.new(root) do
  html response = HTTParty.get('https://spiderum.com')
  text 'Hello, World!'
  pack { padx 15; pady 15; side 'left' }
end

Tk.mainloop