import xml.etree.ElementTree as ET


def xml_to_svg(xml_parse, svg):
     tree = ET.parse(xml_parse)
     root = tree.getroot()

     kml_root = ET.Element('kml', xmlns="http://www.opengis.net/kml/2.2")

     acumulador = []
     dis = 0

     for tramo in root.findall(".//tramos/tramo"):
          distancia = tramo.find('distancia').text
          dis += 30
          acumulador.append(str(dis)+","+distancia)
          
     
     f = open(svg, 'w')

     f.write('<?xml version="1.0" encoding="UTF-8" ?>\n')
     f.write('<svg xmlns="http://www.w3.org/2000/svg" version="1.1"  viewBox="0 0 900 800" preserveAspectRatio="xMidYMid meet">\n')
     f.write('<polyline points= \n"')
     for punto in acumulador: 
          f.write(punto+"\n")
     f.write((acumulador[0]))
     f.write('" style="fill:white;stroke:red;stroke-width:4" />')
     f.write('\n </svg> ')
     f.close()
     
def main():
    nombrexml = input("Nombre del archivo.xml ---> ")
    nombrevg = input("Nombre del archivo.svg ---> ")
    xml_to_svg(nombrexml   ,nombrevg)

if __name__ == "__main__":
    main()    