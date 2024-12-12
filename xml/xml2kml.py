import xml.etree.ElementTree as ET 

def xml_to_kml(xml_path, kml_path):

    tree = ET.parse(xml_path)
    root = tree.getroot()

    kml_root = ET.Element('kml', xmlns="http://www.opengis.net/kml/2.2")

    acumulador = []
    # Expresion xPath dice -> buscame todos las coordenas cuyo padre sea tramo
    for coord in root.findall('.//tramo/coordenada'):
   
        longitud = coord.find('longitud').text
        latitud = coord.find('latitud').text
        altitud = coord.find('altitud').text

        #formato "longitud,latitud,altitud"
        coordinates = f"{longitud},{latitud},{altitud} "+ "\n"
        acumulador.append(coordinates)
        

    # Guardar el archivo KML
    tree_kml = ET.ElementTree(kml_root)
    tree_kml.write(kml_path, encoding="utf-8", xml_declaration=True)

    prologoKML(kml_path, "kml")   
    f = open(kml_path,'a')
    for line in acumulador:
        f.writelines(line)
    f.close()
    epilogoKML(kml_path)

def prologoKML(ar, nombre):
    """ Escribe en el archivo de salida el prólogo del archivo KML"""
    archivo = open(ar, 'w')
    archivo.write('<?xml version="1.0" encoding="UTF-8"?>\n')
    archivo.write('<kml xmlns="http://www.opengis.net/kml/2.2">\n')
    archivo.write("<Document>\n")
    archivo.write("<Placemark>\n")
    archivo.write("<name>"+nombre+"</name>\n")    
    archivo.write("<LineString>\n")
    #la etiqueta <extrude> extiende la línea hasta el suelo 
    archivo.write("<extrude>1</extrude>\n")
    # La etiqueta <tessellate> descompone la línea en porciones pequeñas
    archivo.write("<tessellate>1</tessellate>\n")
    archivo.write("<coordinates>\n")
    archivo.close()

def epilogoKML(ar):
    """ Escribe en el archivo de salida el epílogo del archivo KML"""
    archivo = open(ar, 'a')
    archivo.write("</coordinates>\n")
    archivo.write("<altitudeMode>absolute</altitudeMode>\n")
    archivo.write("</LineString>\n")
    archivo.write("<Style> id='lineaRoja'>\n") 
    archivo.write("<LineStyle>\n") 
    archivo.write("<color>#ff0000ff</color>\n")
    archivo.write("<width>5</width>\n")
    archivo.write("</LineStyle>\n")
    archivo.write("</Style>\n")
    archivo.write("</Placemark>\n")
    archivo.write("</Document>\n")
    archivo.write("</kml>\n")
    archivo.close()

def main():
    nombrexml = input("Nombre del archivo.xml ---> ")
    nombrekml = input("Nombre del archivo.kml ---> ")
    xml_to_kml(nombrexml   ,nombrekml)

if __name__ == "__main__":
    main()    