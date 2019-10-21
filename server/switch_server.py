from dnslib import *
from dnslib import server
import argparse
import json
import sys
import http.server
import socketserver

class DnsResolver:
    def __init__(self, config):
        self.config = config

    def resolve(self, request, handler):
        d = request.reply()
        q = request.get_q()
        q_name = str(q.qname)

        for record in self.config["dns_records"]:
            if record in q_name:
                d.add_answer(*RR.fromZone("{} 136 A {}".format(q_name, self.config["dns_records"][record])))
                return d

        a = DNSRecord.parse(DNSRecord.question(q_name).send(self.config["external_dns"]["address"], self.config["external_dns"]["port"]))
        for rr in a.rr:
            d.add_answer(rr)
        return d

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--config', '-c', dest='config', required=True, help='path to config file')
    args = parser.parse_args()

    with open(args.config, 'r') as f:
        config = json.load(f)

    #Start dns server
    resolver = DnsResolver(config)
    dns_server = server.DNSServer(resolver, port=config["local_dns"]["port"], address=config["local_dns"]["address"])
    dns_server.start_thread()

    #Start http server
    os.chdir(os.path.join(os.path.dirname(__file__), 'www'))
    Handler = http.server.SimpleHTTPRequestHandler
    httpd = socketserver.TCPServer(("", 80), Handler)
    httpd.serve_forever()

if __name__== "__main__":
  main()
