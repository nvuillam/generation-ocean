import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Quadrat } from './quadrat.model';
import {
  AlguaeAnalysis,
  AlguaeAnalysisDTO,
} from '../../ref/alguae-descriptions/alguae-analysis.model';
import { WeatherService } from '../../../services/weather/weather.service';
import { SitesService } from '../sites/sites.service';

@Injectable()
export class QuadratsService {
  constructor(
    @InjectModel('Quadrat')
    private readonly quadratModel: Model<Quadrat>,
    private readonly sitesService: SitesService,
    private readonly weatherService: WeatherService,
  ) {}

  async insertQuadrat(quadratData: Quadrat) {
    const newQuadrat: Quadrat = new this.quadratModel(quadratData);
    const result = await newQuadrat.save().then(savedQuadrat => {
      return this.manageQuadratWeatherData(savedQuadrat);
    });
    return result;
  }

  async getSingleQuadrat(quadratId: string) {
    const quadrat: Quadrat = await this.findQuadrat(quadratId);
    return quadrat;
  }

  async updateQuadrat(quadratId: string, quadratData: Quadrat) {
    const updatedQuadrat: Quadrat = await this.findQuadrat(quadratId);
    updatedQuadrat.set(quadratData);
    const result = await updatedQuadrat.save().then(savedQuadrat => {
      return this.manageQuadratWeatherData(savedQuadrat);
    });
    return result;
  }

  async getQuadratsByTransect(transectId: string) {
    const quadrats = await this.quadratModel
      .find({ transect: transectId })
      .exec();
    return quadrats;
  }

  // List alguaes of a quadrat
  async getSingleQuadratAlguaes(quadratId: string) {
    const quadrat: Quadrat = await this.findQuadrat(quadratId);
    return quadrat.alguaes || [];
  }

  // Upsert alguae analysis in quadrat alguaes list
  async updateQuadratUpsertAlguaeAnalysis(
    quadratId: string,
    alguaeCode: string,
    alguaeAnalysis: AlguaeAnalysisDTO,
  ) {
    const quadrat: Quadrat = await this.findQuadrat(quadratId);
    quadrat.alguaes = quadrat.alguaes || [];
    const existingAlguaeAnalysis = quadrat.alguaes.find(
      v => v.code === alguaeCode,
    );

    if (existingAlguaeAnalysis) {
      // AlguaeAnalysis existing: replace it
      Object.keys(alguaeAnalysis).forEach(
        key => (existingAlguaeAnalysis[key] = alguaeAnalysis[key]),
      ); // copy values of alguaeAnalysis on existingAlguaeAnalysis
      const index = quadrat.alguaes.findIndex(v => v.code === alguaeCode);
      quadrat.alguaes[index] = existingAlguaeAnalysis;
      alguaeAnalysis = existingAlguaeAnalysis;
    } else {
      // AlguaeAnalysis not existing : add it
      alguaeAnalysis.code = alguaeCode;
      quadrat.alguaes.push(alguaeAnalysis);
    }
    quadrat.save();
    return alguaeAnalysis;
  }

  private async findQuadrat(id: string): Promise<Quadrat> {
    let quadrat;
    try {
      quadrat = await this.quadratModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find quadrat.');
    }
    if (!quadrat) {
      throw new NotFoundException('Could not find quadrat.');
    }
    return quadrat;
  }

  // Add weather data on quadrat ( only if GPS location is defined and weather has not been retrieved yet)
  async manageQuadratWeatherData(quadrat: Quadrat): Promise<Quadrat> {
    if (
      quadrat.pos_latitude != null &&
      quadrat.pos_longitude != null &&
      (quadrat.weather == null || quadrat.site == null) // Todo: manage case when site is found after its addition in sites collection in DB
    ) {
      if (quadrat.site == null) {
        const site = await this.sitesService.getSingleSiteByLatitudeLongitude(
          quadrat.pos_latitude,
          quadrat.pos_longitude,
        );
        if (site) {
          quadrat.site = site.id;
          await quadrat.save();
        }
      }

      const localWeatherInfo = await this.weatherService.manageLocalWeatherInfo(
        quadrat,
      );
      // If weather info found, set it on the Observation
      if (localWeatherInfo) {
        const updatedQuadrat: Quadrat = await this.findQuadrat(quadrat._id);
        updatedQuadrat.weather = localWeatherInfo;
        return updatedQuadrat.save();
      }
    }
    return quadrat;
  }

  async getHtmlMapToEmbed(quadratId: string) {
    const quadrat: Quadrat = await this.findQuadrat(quadratId);
    if (quadrat.pos_latitude == null || quadrat.pos_longitude == null) {
      return null;
    }

    const htmlString: string = `
   <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="fr">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css" />
        <script type="text/javascript" src="https://unpkg.com/leaflet@1.3.1/dist/leaflet.js"></script>
    </head>

    <body onload="initialize()">
        <div id="map" style="width:100%; height:100%"></div>
    </body>
</html>
<script type="text/javascript">
    function initialize() {
        var map = L.map('map').setView([${quadrat.pos_latitude}, ${quadrat.pos_longitude}], 12); // LIGNE 14

/*         var osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { // LIGNE 16
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19
        });

        map.addLayer(osmLayer);
 */
        var wmsLayer = L.tileLayer.wms('http://portail.indigeo.fr/geoserver/SHOM/wms?', {
	layers: 'SHOM:RasterMarine_BZH'
}).addTo(map);

 var wmsLayer = L.tileLayer.wms('http://www.ifremer.fr/services/wms/biologie?', {
	transparent: true,
    format: 'image/png',
    layers: 'SINP_HAB_PEREZ_SIEC8182_VEG_P'
}).addTo(map);
var wmsLayer = L.tileLayer.wms('http://www.ifremer.fr/services/wms/biologie?', {
	transparent: true,
    format: 'image/png',
    layers: 'SINP_HAB_PEREZ_SIEC8182_VEG_P'
}).addTo(map);

    }

</script>
   `;
    return htmlString;
  }
}
